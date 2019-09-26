import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PrecioTiendaComponent,
    PrecioTiendaDetailComponent,
    PrecioTiendaUpdateComponent,
    PrecioTiendaDeletePopupComponent,
    PrecioTiendaDeleteDialogComponent,
    precioTiendaRoute,
    precioTiendaPopupRoute
} from './';

const ENTITY_STATES = [...precioTiendaRoute, ...precioTiendaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecioTiendaComponent,
        PrecioTiendaDetailComponent,
        PrecioTiendaUpdateComponent,
        PrecioTiendaDeleteDialogComponent,
        PrecioTiendaDeletePopupComponent
    ],
    entryComponents: [
        PrecioTiendaComponent,
        PrecioTiendaUpdateComponent,
        PrecioTiendaDeleteDialogComponent,
        PrecioTiendaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPrecioTiendaModule {}

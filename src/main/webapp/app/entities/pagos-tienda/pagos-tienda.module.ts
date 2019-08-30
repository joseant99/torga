import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PagosTiendaComponent,
    PagosTiendaDetailComponent,
    PagosTiendaUpdateComponent,
    PagosTiendaDeletePopupComponent,
    PagosTiendaDeleteDialogComponent,
    pagosTiendaRoute,
    pagosTiendaPopupRoute
} from './';

const ENTITY_STATES = [...pagosTiendaRoute, ...pagosTiendaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagosTiendaComponent,
        PagosTiendaDetailComponent,
        PagosTiendaUpdateComponent,
        PagosTiendaDeleteDialogComponent,
        PagosTiendaDeletePopupComponent
    ],
    entryComponents: [PagosTiendaComponent, PagosTiendaUpdateComponent, PagosTiendaDeleteDialogComponent, PagosTiendaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPagosTiendaModule {}

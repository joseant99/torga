import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PedidosComponent,
    PedidosDetailComponent,
    PedidosUpdateComponent,
    PedidosDeletePopupComponent,
    PedidosDeleteDialogComponent,
    pedidosRoute,
    pedidosPopupRoute
} from './';

const ENTITY_STATES = [...pedidosRoute, ...pedidosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PedidosComponent,
        PedidosDetailComponent,
        PedidosUpdateComponent,
        PedidosDeleteDialogComponent,
        PedidosDeletePopupComponent
    ],
    entryComponents: [PedidosComponent, PedidosUpdateComponent, PedidosDeleteDialogComponent, PedidosDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPedidosModule {}

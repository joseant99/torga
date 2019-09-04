import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    MedEspProductoPedidoPresuComponent,
    MedEspProductoPedidoPresuDetailComponent,
    MedEspProductoPedidoPresuUpdateComponent,
    MedEspProductoPedidoPresuDeletePopupComponent,
    MedEspProductoPedidoPresuDeleteDialogComponent,
    medEspProductoPedidoPresuRoute,
    medEspProductoPedidoPresuPopupRoute
} from './';

const ENTITY_STATES = [...medEspProductoPedidoPresuRoute, ...medEspProductoPedidoPresuPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedEspProductoPedidoPresuComponent,
        MedEspProductoPedidoPresuDetailComponent,
        MedEspProductoPedidoPresuUpdateComponent,
        MedEspProductoPedidoPresuDeleteDialogComponent,
        MedEspProductoPedidoPresuDeletePopupComponent
    ],
    entryComponents: [
        MedEspProductoPedidoPresuComponent,
        MedEspProductoPedidoPresuUpdateComponent,
        MedEspProductoPedidoPresuDeleteDialogComponent,
        MedEspProductoPedidoPresuDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosMedEspProductoPedidoPresuModule {}

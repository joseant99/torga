import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PresupuestoArmarioInterioresComponent,
    PresupuestoArmarioInterioresDetailComponent,
    PresupuestoArmarioInterioresUpdateComponent,
    PresupuestoArmarioInterioresDeletePopupComponent,
    PresupuestoArmarioInterioresDeleteDialogComponent,
    presupuestoArmarioInterioresRoute,
    presupuestoArmarioInterioresPopupRoute
} from './';

const ENTITY_STATES = [...presupuestoArmarioInterioresRoute, ...presupuestoArmarioInterioresPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresupuestoArmarioInterioresComponent,
        PresupuestoArmarioInterioresDetailComponent,
        PresupuestoArmarioInterioresUpdateComponent,
        PresupuestoArmarioInterioresDeleteDialogComponent,
        PresupuestoArmarioInterioresDeletePopupComponent
    ],
    entryComponents: [
        PresupuestoArmarioInterioresComponent,
        PresupuestoArmarioInterioresUpdateComponent,
        PresupuestoArmarioInterioresDeleteDialogComponent,
        PresupuestoArmarioInterioresDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPresupuestoArmarioInterioresModule {}

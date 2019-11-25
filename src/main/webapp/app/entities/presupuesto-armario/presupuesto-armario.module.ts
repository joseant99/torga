import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PresupuestoArmarioComponent,
    PresupuestoArmarioDetailComponent,
    PresupuestoArmarioUpdateComponent,
    PresupuestoArmarioDeletePopupComponent,
    PresupuestoArmarioDeleteDialogComponent,
    presupuestoArmarioRoute,
    presupuestoArmarioPopupRoute
} from './';

const ENTITY_STATES = [...presupuestoArmarioRoute, ...presupuestoArmarioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresupuestoArmarioComponent,
        PresupuestoArmarioDetailComponent,
        PresupuestoArmarioUpdateComponent,
        PresupuestoArmarioDeleteDialogComponent,
        PresupuestoArmarioDeletePopupComponent
    ],
    entryComponents: [
        PresupuestoArmarioComponent,
        PresupuestoArmarioUpdateComponent,
        PresupuestoArmarioDeleteDialogComponent,
        PresupuestoArmarioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPresupuestoArmarioModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PresupuestoArmarioPuertasComponent,
    PresupuestoArmarioPuertasDetailComponent,
    PresupuestoArmarioPuertasUpdateComponent,
    PresupuestoArmarioPuertasDeletePopupComponent,
    PresupuestoArmarioPuertasDeleteDialogComponent,
    presupuestoArmarioPuertasRoute,
    presupuestoArmarioPuertasPopupRoute
} from './';

const ENTITY_STATES = [...presupuestoArmarioPuertasRoute, ...presupuestoArmarioPuertasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresupuestoArmarioPuertasComponent,
        PresupuestoArmarioPuertasDetailComponent,
        PresupuestoArmarioPuertasUpdateComponent,
        PresupuestoArmarioPuertasDeleteDialogComponent,
        PresupuestoArmarioPuertasDeletePopupComponent
    ],
    entryComponents: [
        PresupuestoArmarioPuertasComponent,
        PresupuestoArmarioPuertasUpdateComponent,
        PresupuestoArmarioPuertasDeleteDialogComponent,
        PresupuestoArmarioPuertasDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPresupuestoArmarioPuertasModule {}

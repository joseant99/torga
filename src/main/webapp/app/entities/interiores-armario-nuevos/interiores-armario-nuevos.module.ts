import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    InterioresArmarioNuevosComponent,
    InterioresArmarioNuevosDetailComponent,
    InterioresArmarioNuevosUpdateComponent,
    InterioresArmarioNuevosDeletePopupComponent,
    InterioresArmarioNuevosDeleteDialogComponent,
    interioresArmarioNuevosRoute,
    interioresArmarioNuevosPopupRoute
} from './';

const ENTITY_STATES = [...interioresArmarioNuevosRoute, ...interioresArmarioNuevosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InterioresArmarioNuevosComponent,
        InterioresArmarioNuevosDetailComponent,
        InterioresArmarioNuevosUpdateComponent,
        InterioresArmarioNuevosDeleteDialogComponent,
        InterioresArmarioNuevosDeletePopupComponent
    ],
    entryComponents: [
        InterioresArmarioNuevosComponent,
        InterioresArmarioNuevosUpdateComponent,
        InterioresArmarioNuevosDeleteDialogComponent,
        InterioresArmarioNuevosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosInterioresArmarioNuevosModule {}

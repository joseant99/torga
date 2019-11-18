import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ArmarioComponent,
    ArmarioDetailComponent,
    ArmarioUpdateComponent,
    ArmarioDeletePopupComponent,
    ArmarioDeleteDialogComponent,
    armarioRoute,
    armarioPopupRoute
} from './';

const ENTITY_STATES = [...armarioRoute, ...armarioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArmarioComponent,
        ArmarioDetailComponent,
        ArmarioUpdateComponent,
        ArmarioDeleteDialogComponent,
        ArmarioDeletePopupComponent
    ],
    entryComponents: [ArmarioComponent, ArmarioUpdateComponent, ArmarioDeleteDialogComponent, ArmarioDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosArmarioModule {}

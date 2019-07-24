import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    AcabadosComponent,
    AcabadosDetailComponent,
    AcabadosUpdateComponent,
    AcabadosDeletePopupComponent,
    AcabadosDeleteDialogComponent,
    acabadosRoute,
    acabadosPopupRoute
} from './';

const ENTITY_STATES = [...acabadosRoute, ...acabadosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcabadosComponent,
        AcabadosDetailComponent,
        AcabadosUpdateComponent,
        AcabadosDeleteDialogComponent,
        AcabadosDeletePopupComponent
    ],
    entryComponents: [AcabadosComponent, AcabadosUpdateComponent, AcabadosDeleteDialogComponent, AcabadosDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcabadosModule {}

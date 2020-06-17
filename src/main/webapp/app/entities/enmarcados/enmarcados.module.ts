import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    EnmarcadosComponent,
    EnmarcadosDetailComponent,
    EnmarcadosUpdateComponent,
    EnmarcadosDeletePopupComponent,
    EnmarcadosDeleteDialogComponent,
    enmarcadosRoute,
    enmarcadosPopupRoute
} from './';

const ENTITY_STATES = [...enmarcadosRoute, ...enmarcadosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnmarcadosComponent,
        EnmarcadosDetailComponent,
        EnmarcadosUpdateComponent,
        EnmarcadosDeleteDialogComponent,
        EnmarcadosDeletePopupComponent
    ],
    entryComponents: [EnmarcadosComponent, EnmarcadosUpdateComponent, EnmarcadosDeleteDialogComponent, EnmarcadosDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosEnmarcadosModule {}

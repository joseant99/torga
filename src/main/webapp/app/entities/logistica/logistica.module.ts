import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    LogisticaComponent,
    LogisticaDetailComponent,
    LogisticaUpdateComponent,
    LogisticaDeletePopupComponent,
    LogisticaDeleteDialogComponent,
    logisticaRoute,
    logisticaPopupRoute
} from './';

const ENTITY_STATES = [...logisticaRoute, ...logisticaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LogisticaComponent,
        LogisticaDetailComponent,
        LogisticaUpdateComponent,
        LogisticaDeleteDialogComponent,
        LogisticaDeletePopupComponent
    ],
    entryComponents: [LogisticaComponent, LogisticaUpdateComponent, LogisticaDeleteDialogComponent, LogisticaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosLogisticaModule {}

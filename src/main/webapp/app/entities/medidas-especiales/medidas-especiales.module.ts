import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    MedidasEspecialesComponent,
    MedidasEspecialesDetailComponent,
    MedidasEspecialesUpdateComponent,
    MedidasEspecialesDeletePopupComponent,
    MedidasEspecialesDeleteDialogComponent,
    medidasEspecialesRoute,
    medidasEspecialesPopupRoute
} from './';

const ENTITY_STATES = [...medidasEspecialesRoute, ...medidasEspecialesPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedidasEspecialesComponent,
        MedidasEspecialesDetailComponent,
        MedidasEspecialesUpdateComponent,
        MedidasEspecialesDeleteDialogComponent,
        MedidasEspecialesDeletePopupComponent
    ],
    entryComponents: [
        MedidasEspecialesComponent,
        MedidasEspecialesUpdateComponent,
        MedidasEspecialesDeleteDialogComponent,
        MedidasEspecialesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosMedidasEspecialesModule {}

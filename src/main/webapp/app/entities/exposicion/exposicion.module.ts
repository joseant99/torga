import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ExposicionComponent,
    ExposicionDetailComponent,
    ExposicionUpdateComponent,
    ExposicionDeletePopupComponent,
    ExposicionDeleteDialogComponent,
    exposicionRoute,
    exposicionPopupRoute
} from './';

const ENTITY_STATES = [...exposicionRoute, ...exposicionPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExposicionComponent,
        ExposicionDetailComponent,
        ExposicionUpdateComponent,
        ExposicionDeleteDialogComponent,
        ExposicionDeletePopupComponent
    ],
    entryComponents: [ExposicionComponent, ExposicionUpdateComponent, ExposicionDeleteDialogComponent, ExposicionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosExposicionModule {}

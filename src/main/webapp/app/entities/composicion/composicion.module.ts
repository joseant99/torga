import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ComposicionComponent,
    ComposicionNtTodasComponent,
    ComposicionDetailComponent,
    ComposicionUpdateComponent,
    ComposicionVerComponent,
    ComposicionDeletePopupComponent,
    ComposicionDeleteDialogComponent,
    composicionRoute,
    composicionPopupRoute
} from './';

const ENTITY_STATES = [...composicionRoute, ...composicionPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ComposicionComponent,
        ComposicionVerComponent,
        ComposicionNtTodasComponent,
        ComposicionDetailComponent,
        ComposicionUpdateComponent,
        ComposicionDeleteDialogComponent,
        ComposicionDeletePopupComponent
    ],
    entryComponents: [ComposicionComponent, ComposicionUpdateComponent, ComposicionDeleteDialogComponent, ComposicionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosComposicionModule {}

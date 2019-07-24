import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    AcabadosComposicionComponent,
    AcabadosComposicionDetailComponent,
    AcabadosComposicionUpdateComponent,
    AcabadosComposicionDeletePopupComponent,
    AcabadosComposicionDeleteDialogComponent,
    acabadosComposicionRoute,
    acabadosComposicionPopupRoute
} from './';

const ENTITY_STATES = [...acabadosComposicionRoute, ...acabadosComposicionPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcabadosComposicionComponent,
        AcabadosComposicionDetailComponent,
        AcabadosComposicionUpdateComponent,
        AcabadosComposicionDeleteDialogComponent,
        AcabadosComposicionDeletePopupComponent
    ],
    entryComponents: [
        AcabadosComposicionComponent,
        AcabadosComposicionUpdateComponent,
        AcabadosComposicionDeleteDialogComponent,
        AcabadosComposicionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcabadosComposicionModule {}

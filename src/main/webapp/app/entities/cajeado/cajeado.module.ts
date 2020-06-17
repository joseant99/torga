import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    CajeadoComponent,
    CajeadoDetailComponent,
    CajeadoUpdateComponent,
    CajeadoDeletePopupComponent,
    CajeadoDeleteDialogComponent,
    cajeadoRoute,
    cajeadoPopupRoute
} from './';

const ENTITY_STATES = [...cajeadoRoute, ...cajeadoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CajeadoComponent,
        CajeadoDetailComponent,
        CajeadoUpdateComponent,
        CajeadoDeleteDialogComponent,
        CajeadoDeletePopupComponent
    ],
    entryComponents: [CajeadoComponent, CajeadoUpdateComponent, CajeadoDeleteDialogComponent, CajeadoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosCajeadoModule {}

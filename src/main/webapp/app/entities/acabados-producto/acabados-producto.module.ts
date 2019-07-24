import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    AcabadosProductoComponent,
    AcabadosProductoDetailComponent,
    AcabadosProductoUpdateComponent,
    AcabadosProductoDeletePopupComponent,
    AcabadosProductoDeleteDialogComponent,
    acabadosProductoRoute,
    acabadosProductoPopupRoute
} from './';

const ENTITY_STATES = [...acabadosProductoRoute, ...acabadosProductoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcabadosProductoComponent,
        AcabadosProductoDetailComponent,
        AcabadosProductoUpdateComponent,
        AcabadosProductoDeleteDialogComponent,
        AcabadosProductoDeletePopupComponent
    ],
    entryComponents: [
        AcabadosProductoComponent,
        AcabadosProductoUpdateComponent,
        AcabadosProductoDeleteDialogComponent,
        AcabadosProductoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcabadosProductoModule {}

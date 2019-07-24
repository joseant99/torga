import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    TiposApoyoComponent,
    TiposApoyoDetailComponent,
    TiposApoyoUpdateComponent,
    TiposApoyoDeletePopupComponent,
    TiposApoyoDeleteDialogComponent,
    tiposApoyoRoute,
    tiposApoyoPopupRoute
} from './';

const ENTITY_STATES = [...tiposApoyoRoute, ...tiposApoyoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TiposApoyoComponent,
        TiposApoyoDetailComponent,
        TiposApoyoUpdateComponent,
        TiposApoyoDeleteDialogComponent,
        TiposApoyoDeletePopupComponent
    ],
    entryComponents: [TiposApoyoComponent, TiposApoyoUpdateComponent, TiposApoyoDeleteDialogComponent, TiposApoyoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosTiposApoyoModule {}

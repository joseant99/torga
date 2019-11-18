import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PuertasPreciosComponent,
    PuertasPreciosDetailComponent,
    PuertasPreciosUpdateComponent,
    PuertasPreciosDeletePopupComponent,
    PuertasPreciosDeleteDialogComponent,
    puertasPreciosRoute,
    puertasPreciosPopupRoute
} from './';

const ENTITY_STATES = [...puertasPreciosRoute, ...puertasPreciosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PuertasPreciosComponent,
        PuertasPreciosDetailComponent,
        PuertasPreciosUpdateComponent,
        PuertasPreciosDeleteDialogComponent,
        PuertasPreciosDeletePopupComponent
    ],
    entryComponents: [
        PuertasPreciosComponent,
        PuertasPreciosUpdateComponent,
        PuertasPreciosDeleteDialogComponent,
        PuertasPreciosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPuertasPreciosModule {}

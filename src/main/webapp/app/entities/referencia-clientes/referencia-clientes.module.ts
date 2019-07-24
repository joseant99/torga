import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ReferenciaClientesComponent,
    ReferenciaClientesDetailComponent,
    ReferenciaClientesUpdateComponent,
    ReferenciaClientesDeletePopupComponent,
    ReferenciaClientesDeleteDialogComponent,
    referenciaClientesRoute,
    referenciaClientesPopupRoute
} from './';

const ENTITY_STATES = [...referenciaClientesRoute, ...referenciaClientesPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReferenciaClientesComponent,
        ReferenciaClientesDetailComponent,
        ReferenciaClientesUpdateComponent,
        ReferenciaClientesDeleteDialogComponent,
        ReferenciaClientesDeletePopupComponent
    ],
    entryComponents: [
        ReferenciaClientesComponent,
        ReferenciaClientesUpdateComponent,
        ReferenciaClientesDeleteDialogComponent,
        ReferenciaClientesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosReferenciaClientesModule {}

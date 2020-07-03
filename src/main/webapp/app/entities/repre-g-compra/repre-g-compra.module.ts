import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    RepreGCompraComponent,
    RepreGCompraDetailComponent,
    RepreGCompraUpdateComponent,
    RepreGCompraDeletePopupComponent,
    RepreGCompraDeleteDialogComponent,
    repreGCompraRoute,
    repreGCompraPopupRoute
} from './';

const ENTITY_STATES = [...repreGCompraRoute, ...repreGCompraPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepreGCompraComponent,
        RepreGCompraDetailComponent,
        RepreGCompraUpdateComponent,
        RepreGCompraDeleteDialogComponent,
        RepreGCompraDeletePopupComponent
    ],
    entryComponents: [
        RepreGCompraComponent,
        RepreGCompraUpdateComponent,
        RepreGCompraDeleteDialogComponent,
        RepreGCompraDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosRepreGCompraModule {}

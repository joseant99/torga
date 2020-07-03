import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    TransportistaTablaComponent,
    TransportistaTablaDetailComponent,
    TransportistaTablaUpdateComponent,
    TransportistaTablaDeletePopupComponent,
    TransportistaTablaDeleteDialogComponent,
    transportistaTablaRoute,
    transportistaTablaPopupRoute
} from './';

const ENTITY_STATES = [...transportistaTablaRoute, ...transportistaTablaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportistaTablaComponent,
        TransportistaTablaDetailComponent,
        TransportistaTablaUpdateComponent,
        TransportistaTablaDeleteDialogComponent,
        TransportistaTablaDeletePopupComponent
    ],
    entryComponents: [
        TransportistaTablaComponent,
        TransportistaTablaUpdateComponent,
        TransportistaTablaDeleteDialogComponent,
        TransportistaTablaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosTransportistaTablaModule {}

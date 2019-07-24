import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    TransportistasComponent,
    TransportistasDetailComponent,
    TransportistasUpdateComponent,
    TransportistasDeletePopupComponent,
    TransportistasDeleteDialogComponent,
    transportistasRoute,
    transportistasPopupRoute
} from './';

const ENTITY_STATES = [...transportistasRoute, ...transportistasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportistasComponent,
        TransportistasDetailComponent,
        TransportistasUpdateComponent,
        TransportistasDeleteDialogComponent,
        TransportistasDeletePopupComponent
    ],
    entryComponents: [
        TransportistasComponent,
        TransportistasUpdateComponent,
        TransportistasDeleteDialogComponent,
        TransportistasDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosTransportistasModule {}

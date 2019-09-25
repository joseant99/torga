import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    PuertasComponent,
    PuertasDetailComponent,
    PuertasUpdateComponent,
    PuertasDeletePopupComponent,
    PuertasDeleteDialogComponent,
    puertasRoute,
    puertasPopupRoute
} from './';

const ENTITY_STATES = [...puertasRoute, ...puertasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PuertasComponent,
        PuertasDetailComponent,
        PuertasUpdateComponent,
        PuertasDeleteDialogComponent,
        PuertasDeletePopupComponent
    ],
    entryComponents: [PuertasComponent, PuertasUpdateComponent, PuertasDeleteDialogComponent, PuertasDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPuertasModule {}

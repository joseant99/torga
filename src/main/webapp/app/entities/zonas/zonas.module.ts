import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ZonasComponent,
    ZonasDetailComponent,
    ZonasUpdateComponent,
    ZonasDeletePopupComponent,
    ZonasDeleteDialogComponent,
    zonasRoute,
    zonasPopupRoute
} from './';

const ENTITY_STATES = [...zonasRoute, ...zonasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ZonasComponent, ZonasDetailComponent, ZonasUpdateComponent, ZonasDeleteDialogComponent, ZonasDeletePopupComponent],
    entryComponents: [ZonasComponent, ZonasUpdateComponent, ZonasDeleteDialogComponent, ZonasDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosZonasModule {}

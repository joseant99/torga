import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    DireccionTiendasComponent,
    DireccionTiendasUsuComponent,
    DireccionTiendasDetailComponent,
    DireccionTiendasUpdateComponent,
    DireccionTiendasDeletePopupComponent,
    DireccionTiendasDeleteDialogComponent,
    direccionTiendasRoute,
    direccionTiendasPopupRoute
} from './';

const ENTITY_STATES = [...direccionTiendasRoute, ...direccionTiendasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DireccionTiendasComponent,
        DireccionTiendasDetailComponent,
        DireccionTiendasUsuComponent,
        DireccionTiendasUpdateComponent,
        DireccionTiendasDeleteDialogComponent,
        DireccionTiendasDeletePopupComponent
    ],
    entryComponents: [
        DireccionTiendasComponent,
        DireccionTiendasUpdateComponent,
        DireccionTiendasUsuComponent,
        DireccionTiendasDeleteDialogComponent,
        DireccionTiendasDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosDireccionTiendasModule {}

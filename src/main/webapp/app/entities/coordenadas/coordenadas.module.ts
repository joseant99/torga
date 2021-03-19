import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    CoordenadasComponent,
    CoordenadasDetailComponent,
    CoordenadasUpdateComponent,
    CoordenadasDeletePopupComponent,
    CoordenadasDeleteDialogComponent,
    coordenadasRoute,
    coordenadasPopupRoute
} from './';

const ENTITY_STATES = [...coordenadasRoute, ...coordenadasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CoordenadasComponent,
        CoordenadasDetailComponent,
        CoordenadasUpdateComponent,
        CoordenadasDeleteDialogComponent,
        CoordenadasDeletePopupComponent
    ],
    entryComponents: [CoordenadasComponent, CoordenadasUpdateComponent, CoordenadasDeleteDialogComponent, CoordenadasDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosCoordenadasModule {}

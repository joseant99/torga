import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    InteriorArmarioDentroComponent,
    InteriorArmarioDentroDetailComponent,
    InteriorArmarioDentroUpdateComponent,
    InteriorArmarioDentroDeletePopupComponent,
    InteriorArmarioDentroDeleteDialogComponent,
    interiorArmarioDentroRoute,
    interiorArmarioDentroPopupRoute
} from './';

const ENTITY_STATES = [...interiorArmarioDentroRoute, ...interiorArmarioDentroPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InteriorArmarioDentroComponent,
        InteriorArmarioDentroDetailComponent,
        InteriorArmarioDentroUpdateComponent,
        InteriorArmarioDentroDeleteDialogComponent,
        InteriorArmarioDentroDeletePopupComponent
    ],
    entryComponents: [
        InteriorArmarioDentroComponent,
        InteriorArmarioDentroUpdateComponent,
        InteriorArmarioDentroDeleteDialogComponent,
        InteriorArmarioDentroDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosInteriorArmarioDentroModule {}

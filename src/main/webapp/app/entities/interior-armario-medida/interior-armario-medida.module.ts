import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    InteriorArmarioMedidaComponent,
    InteriorArmarioMedidaDetailComponent,
    InteriorArmarioMedidaUpdateComponent,
    InteriorArmarioMedidaDeletePopupComponent,
    InteriorArmarioMedidaDeleteDialogComponent,
    interiorArmarioMedidaRoute,
    interiorArmarioMedidaPopupRoute
} from './';

const ENTITY_STATES = [...interiorArmarioMedidaRoute, ...interiorArmarioMedidaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InteriorArmarioMedidaComponent,
        InteriorArmarioMedidaDetailComponent,
        InteriorArmarioMedidaUpdateComponent,
        InteriorArmarioMedidaDeleteDialogComponent,
        InteriorArmarioMedidaDeletePopupComponent
    ],
    entryComponents: [
        InteriorArmarioMedidaComponent,
        InteriorArmarioMedidaUpdateComponent,
        InteriorArmarioMedidaDeleteDialogComponent,
        InteriorArmarioMedidaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosInteriorArmarioMedidaModule {}

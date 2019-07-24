import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    Acabados_ProductosComponent,
    Acabados_ProductosDetailComponent,
    Acabados_ProductosUpdateComponent,
    Acabados_ProductosDeletePopupComponent,
    Acabados_ProductosDeleteDialogComponent,
    acabados_ProductosRoute,
    acabados_ProductosPopupRoute
} from './';

const ENTITY_STATES = [...acabados_ProductosRoute, ...acabados_ProductosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Acabados_ProductosComponent,
        Acabados_ProductosDetailComponent,
        Acabados_ProductosUpdateComponent,
        Acabados_ProductosDeleteDialogComponent,
        Acabados_ProductosDeletePopupComponent
    ],
    entryComponents: [
        Acabados_ProductosComponent,
        Acabados_ProductosUpdateComponent,
        Acabados_ProductosDeleteDialogComponent,
        Acabados_ProductosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcabados_ProductosModule {}

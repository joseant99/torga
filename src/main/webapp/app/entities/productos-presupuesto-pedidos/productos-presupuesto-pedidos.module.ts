import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ProductosPresupuestoPedidosComponent,
    ProductosPresupuestoPedidosDetailComponent,
    ProductosPresupuestoPedidosUpdateComponent,
    ProductosPresupuestoPedidosDeletePopupComponent,
    ProductosPresupuestoPedidosDeleteDialogComponent,
    productosPresupuestoPedidosRoute,
    productosPresupuestoPedidosPopupRoute
} from './';

const ENTITY_STATES = [...productosPresupuestoPedidosRoute, ...productosPresupuestoPedidosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductosPresupuestoPedidosComponent,
        ProductosPresupuestoPedidosDetailComponent,
        ProductosPresupuestoPedidosUpdateComponent,
        ProductosPresupuestoPedidosDeleteDialogComponent,
        ProductosPresupuestoPedidosDeletePopupComponent
    ],
    entryComponents: [
        ProductosPresupuestoPedidosComponent,
        ProductosPresupuestoPedidosUpdateComponent,
        ProductosPresupuestoPedidosDeleteDialogComponent,
        ProductosPresupuestoPedidosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProductosPresupuestoPedidosModule {}

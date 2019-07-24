import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ProductosComposicionComponent,
    ProductosComposicionDetailComponent,
    ProductosComposicionUpdateComponent,
    ProductosComposicionDeletePopupComponent,
    ProductosComposicionDeleteDialogComponent,
    productosComposicionRoute,
    productosComposicionPopupRoute
} from './';

const ENTITY_STATES = [...productosComposicionRoute, ...productosComposicionPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductosComposicionComponent,
        ProductosComposicionDetailComponent,
        ProductosComposicionUpdateComponent,
        ProductosComposicionDeleteDialogComponent,
        ProductosComposicionDeletePopupComponent
    ],
    entryComponents: [
        ProductosComposicionComponent,
        ProductosComposicionUpdateComponent,
        ProductosComposicionDeleteDialogComponent,
        ProductosComposicionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProductosComposicionModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ProductosDormitorioComponent,
    ProductosDormitorioDetailComponent,
    ProductosDormitorioUpdateComponent,
    ProductosDormitorioCategoriaComponent,
    ProductosDormitorioChinfonierComponent,
    ProductosDormitorioDeletePopupComponent,
    ProductosDormitorioCabecerosComponent,
    ProductosDormitorioApoyoComponent,
    ProductosDormitorioCanapeComponent,
    ProductosDormitorioDeleteDialogComponent,
    productosDormitorioRoute,
    productosDormitorioPopupRoute
} from './';

const ENTITY_STATES = [...productosDormitorioRoute, ...productosDormitorioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductosDormitorioComponent,
        ProductosDormitorioDetailComponent,
        ProductosDormitorioApoyoComponent,
        ProductosDormitorioCanapeComponent,
        ProductosDormitorioCabecerosComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioUpdateComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent
    ],
    entryComponents: [
        ProductosDormitorioComponent,
        ProductosDormitorioApoyoComponent,
        ProductosDormitorioCabecerosComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioCanapeComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosDormitorioUpdateComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProductosDormitorioModule {}

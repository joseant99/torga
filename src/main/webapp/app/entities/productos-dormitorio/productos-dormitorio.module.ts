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
    ProductosModulosBajosComponent,
    ProductosDormitorioCabecerosComponent,
    ArmariosDormitorioComponent,
    ProductosDormitorioApoyoComponent,
    ProductosDormitorioCanapeComponent,
    ProductosAparadoresComponent,
    ProductosSingularesComponent,
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
        ProductosAparadoresComponent,
        ProductosSingularesComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosModulosBajosComponent,
        ArmariosDormitorioComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioUpdateComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent
    ],
    entryComponents: [
        ProductosDormitorioComponent,
        ProductosDormitorioApoyoComponent,
        ProductosDormitorioCabecerosComponent,
        ProductosAparadoresComponent,
        ArmariosDormitorioComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioCanapeComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosDormitorioUpdateComponent,
        ProductosSingularesComponent,
        ProductosModulosBajosComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProductosDormitorioModule {}

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
    ProductosColgantesEstantesComponent,
    ProductosVitrinasComponent,
    ProductosDormitorioCabecerosComponent,
    ProductosEscritoriosComponent,
    ProductosColgantesEstanteriaComponent,
    ArmariosDormitorioComponent,
    ProductosDormitorioApoyoComponent,
    ProductosDormitorioCanapeComponent,
    ProductosAparadoresComponent,
    ProductosColgantesComponent,
    ProductosBuscadorComponent,
    ProductosSingularesComponent,
    ProductosDormitorioDeleteDialogComponent,
    productosDormitorioRoute,
    productosDormitorioPopupRoute,
    ProductosEditarComponent
} from './';

const ENTITY_STATES = [...productosDormitorioRoute, ...productosDormitorioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductosDormitorioComponent,
        ProductosDormitorioDetailComponent,
        ProductosDormitorioApoyoComponent,
        ProductosBuscadorComponent,
        ProductosDormitorioCanapeComponent,
        ProductosDormitorioCabecerosComponent,
        ProductosAparadoresComponent,
        ProductosColgantesEstantesComponent,
        ProductosVitrinasComponent,
        ProductosEscritoriosComponent,
        ProductosColgantesEstanteriaComponent,
        ProductosSingularesComponent,
        ProductosColgantesComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosModulosBajosComponent,
        ArmariosDormitorioComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioUpdateComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent,
        ProductosEditarComponent
    ],
    entryComponents: [
        ProductosDormitorioComponent,
        ProductosDormitorioApoyoComponent,
        ProductosDormitorioCabecerosComponent,
        ProductosAparadoresComponent,
        ArmariosDormitorioComponent,
        ProductosColgantesEstantesComponent,
        ProductosEscritoriosComponent,
        ProductosVitrinasComponent,
        ProductosColgantesComponent,
        ProductosColgantesEstanteriaComponent,
        ProductosDormitorioCategoriaComponent,
        ProductosDormitorioCanapeComponent,
        ProductosBuscadorComponent,
        ProductosDormitorioChinfonierComponent,
        ProductosDormitorioUpdateComponent,
        ProductosSingularesComponent,
        ProductosModulosBajosComponent,
        ProductosDormitorioDeleteDialogComponent,
        ProductosDormitorioDeletePopupComponent,
        ProductosEditarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProductosDormitorioModule {}

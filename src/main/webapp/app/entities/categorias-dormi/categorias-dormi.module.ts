import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    CategoriasDormiComponent,
    ProductosPrecioComponent,
    CategoriasDormiFormularioComponent,
    CategoriasDormiDetailComponent,
    CategoriasDormiUpdateComponent,
    CategoriasDormiDeletePopupComponent,
    CategoriasDormiDeleteDialogComponent,
    categoriasDormiRoute,
    categoriasDormiPopupRoute
} from './';

const ENTITY_STATES = [...categoriasDormiRoute, ...categoriasDormiPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoriasDormiComponent,
        ProductosPrecioComponent,
        CategoriasDormiFormularioComponent,
        CategoriasDormiDetailComponent,
        CategoriasDormiUpdateComponent,
        CategoriasDormiDeleteDialogComponent,
        CategoriasDormiDeletePopupComponent
    ],
    entryComponents: [
        CategoriasDormiComponent,
        ProductosPrecioComponent,
        CategoriasDormiUpdateComponent,
        CategoriasDormiDeleteDialogComponent,
        CategoriasDormiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosCategoriasDormiModule {}

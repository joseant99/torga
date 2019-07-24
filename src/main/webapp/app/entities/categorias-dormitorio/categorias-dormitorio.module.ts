import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    Categorias_DormitorioComponent,
    Categorias_DormitorioDetailComponent,
    Categorias_DormitorioUpdateComponent,
    Categorias_DormitorioDeletePopupComponent,
    Categorias_DormitorioDeleteDialogComponent,
    categorias_DormitorioRoute,
    categorias_DormitorioPopupRoute
} from './';

const ENTITY_STATES = [...categorias_DormitorioRoute, ...categorias_DormitorioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Categorias_DormitorioComponent,
        Categorias_DormitorioDetailComponent,
        Categorias_DormitorioUpdateComponent,
        Categorias_DormitorioDeleteDialogComponent,
        Categorias_DormitorioDeletePopupComponent
    ],
    entryComponents: [
        Categorias_DormitorioComponent,
        Categorias_DormitorioUpdateComponent,
        Categorias_DormitorioDeleteDialogComponent,
        Categorias_DormitorioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosCategorias_DormitorioModule {}

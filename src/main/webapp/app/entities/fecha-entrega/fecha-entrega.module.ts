import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    Fecha_entregaComponent,
    Fecha_entregaDetailComponent,
    Fecha_entregaUpdateComponent,
    Fecha_entregaDeletePopupComponent,
    Fecha_entregaDeleteDialogComponent,
    fecha_entregaRoute,
    fecha_entregaPopupRoute
} from './';

const ENTITY_STATES = [...fecha_entregaRoute, ...fecha_entregaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        Fecha_entregaComponent,
        Fecha_entregaDetailComponent,
        Fecha_entregaUpdateComponent,
        Fecha_entregaDeleteDialogComponent,
        Fecha_entregaDeletePopupComponent
    ],
    entryComponents: [
        Fecha_entregaComponent,
        Fecha_entregaUpdateComponent,
        Fecha_entregaDeleteDialogComponent,
        Fecha_entregaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosFecha_entregaModule {}

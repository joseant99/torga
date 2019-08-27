import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    AcabadosProductosPresupuestoPedidoComponent,
    AcabadosProductosPresupuestoPedidoDetailComponent,
    AcabadosProductosPresupuestoPedidoUpdateComponent,
    AcabadosProductosPresupuestoPedidoDeletePopupComponent,
    AcabadosProductosPresupuestoPedidoDeleteDialogComponent,
    acabadosProductosPresupuestoPedidoRoute,
    acabadosProductosPresupuestoPedidoPopupRoute
} from './';

const ENTITY_STATES = [...acabadosProductosPresupuestoPedidoRoute, ...acabadosProductosPresupuestoPedidoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcabadosProductosPresupuestoPedidoComponent,
        AcabadosProductosPresupuestoPedidoDetailComponent,
        AcabadosProductosPresupuestoPedidoUpdateComponent,
        AcabadosProductosPresupuestoPedidoDeleteDialogComponent,
        AcabadosProductosPresupuestoPedidoDeletePopupComponent
    ],
    entryComponents: [
        AcabadosProductosPresupuestoPedidoComponent,
        AcabadosProductosPresupuestoPedidoUpdateComponent,
        AcabadosProductosPresupuestoPedidoDeleteDialogComponent,
        AcabadosProductosPresupuestoPedidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcabadosProductosPresupuestoPedidoModule {}

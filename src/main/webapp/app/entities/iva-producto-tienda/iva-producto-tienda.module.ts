import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    IvaProductoTiendaComponent,
    IvaProductoTiendaDetailComponent,
    IvaProductoTiendaUpdateComponent,
    IvaProductoTiendaDeletePopupComponent,
    IvaProductoTiendaDeleteDialogComponent,
    ivaProductoTiendaRoute,
    ivaProductoTiendaPopupRoute
} from './';

const ENTITY_STATES = [...ivaProductoTiendaRoute, ...ivaProductoTiendaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IvaProductoTiendaComponent,
        IvaProductoTiendaDetailComponent,
        IvaProductoTiendaUpdateComponent,
        IvaProductoTiendaDeleteDialogComponent,
        IvaProductoTiendaDeletePopupComponent
    ],
    entryComponents: [
        IvaProductoTiendaComponent,
        IvaProductoTiendaUpdateComponent,
        IvaProductoTiendaDeleteDialogComponent,
        IvaProductoTiendaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosIvaProductoTiendaModule {}

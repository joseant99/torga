import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    TiradoresArmarioComponent,
    TiradoresArmarioDetailComponent,
    TiradoresArmarioUpdateComponent,
    TiradoresArmarioDeletePopupComponent,
    TiradoresArmarioDeleteDialogComponent,
    tiradoresArmarioRoute,
    tiradoresArmarioPopupRoute
} from './';

const ENTITY_STATES = [...tiradoresArmarioRoute, ...tiradoresArmarioPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TiradoresArmarioComponent,
        TiradoresArmarioDetailComponent,
        TiradoresArmarioUpdateComponent,
        TiradoresArmarioDeleteDialogComponent,
        TiradoresArmarioDeletePopupComponent
    ],
    entryComponents: [
        TiradoresArmarioComponent,
        TiradoresArmarioUpdateComponent,
        TiradoresArmarioDeleteDialogComponent,
        TiradoresArmarioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosTiradoresArmarioModule {}

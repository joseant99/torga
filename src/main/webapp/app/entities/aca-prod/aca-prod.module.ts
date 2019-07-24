import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    AcaProdComponent,
    AcaProdDetailComponent,
    AcaProdUpdateComponent,
    AcaProdDeletePopupComponent,
    AcaProdDeleteDialogComponent,
    acaProdRoute,
    acaProdPopupRoute
} from './';

const ENTITY_STATES = [...acaProdRoute, ...acaProdPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcaProdComponent,
        AcaProdDetailComponent,
        AcaProdUpdateComponent,
        AcaProdDeleteDialogComponent,
        AcaProdDeletePopupComponent
    ],
    entryComponents: [AcaProdComponent, AcaProdUpdateComponent, AcaProdDeleteDialogComponent, AcaProdDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosAcaProdModule {}

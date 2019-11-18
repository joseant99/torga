import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    CascoComponent,
    CascoDetailComponent,
    CascoUpdateComponent,
    CascoDeletePopupComponent,
    CascoDeleteDialogComponent,
    cascoRoute,
    cascoPopupRoute
} from './';

const ENTITY_STATES = [...cascoRoute, ...cascoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CascoComponent, CascoDetailComponent, CascoUpdateComponent, CascoDeleteDialogComponent, CascoDeletePopupComponent],
    entryComponents: [CascoComponent, CascoUpdateComponent, CascoDeleteDialogComponent, CascoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosCascoModule {}

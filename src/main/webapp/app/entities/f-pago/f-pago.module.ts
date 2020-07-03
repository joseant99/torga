import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    FPagoComponent,
    FPagoDetailComponent,
    FPagoUpdateComponent,
    FPagoDeletePopupComponent,
    FPagoDeleteDialogComponent,
    fPagoRoute,
    fPagoPopupRoute
} from './';

const ENTITY_STATES = [...fPagoRoute, ...fPagoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FPagoComponent, FPagoDetailComponent, FPagoUpdateComponent, FPagoDeleteDialogComponent, FPagoDeletePopupComponent],
    entryComponents: [FPagoComponent, FPagoUpdateComponent, FPagoDeleteDialogComponent, FPagoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosFPagoModule {}

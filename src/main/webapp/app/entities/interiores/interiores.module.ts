import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    InterioresComponent,
    InterioresDetailComponent,
    InterioresUpdateComponent,
    InterioresDeletePopupComponent,
    InterioresDeleteDialogComponent,
    interioresRoute,
    interioresPopupRoute
} from './';

const ENTITY_STATES = [...interioresRoute, ...interioresPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InterioresComponent,
        InterioresDetailComponent,
        InterioresUpdateComponent,
        InterioresDeleteDialogComponent,
        InterioresDeletePopupComponent
    ],
    entryComponents: [InterioresComponent, InterioresUpdateComponent, InterioresDeleteDialogComponent, InterioresDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosInterioresModule {}

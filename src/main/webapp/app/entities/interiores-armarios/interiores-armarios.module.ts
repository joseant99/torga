import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    InterioresArmariosComponent,
    InterioresArmariosDetailComponent,
    InterioresArmariosUpdateComponent,
    InterioresArmariosDeletePopupComponent,
    InterioresArmariosDeleteDialogComponent,
    interioresArmariosRoute,
    interioresArmariosPopupRoute
} from './';

const ENTITY_STATES = [...interioresArmariosRoute, ...interioresArmariosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InterioresArmariosComponent,
        InterioresArmariosDetailComponent,
        InterioresArmariosUpdateComponent,
        InterioresArmariosDeleteDialogComponent,
        InterioresArmariosDeletePopupComponent
    ],
    entryComponents: [
        InterioresArmariosComponent,
        InterioresArmariosUpdateComponent,
        InterioresArmariosDeleteDialogComponent,
        InterioresArmariosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosInterioresArmariosModule {}

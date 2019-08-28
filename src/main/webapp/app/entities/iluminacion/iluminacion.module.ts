import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    IluminacionComponent,
    IluminacionDetailComponent,
    IluminacionUpdateComponent,
    IluminacionDeletePopupComponent,
    IluminacionDeleteDialogComponent,
    iluminacionRoute,
    iluminacionPopupRoute
} from './';

const ENTITY_STATES = [...iluminacionRoute, ...iluminacionPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IluminacionComponent,
        IluminacionDetailComponent,
        IluminacionUpdateComponent,
        IluminacionDeleteDialogComponent,
        IluminacionDeletePopupComponent
    ],
    entryComponents: [IluminacionComponent, IluminacionUpdateComponent, IluminacionDeleteDialogComponent, IluminacionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosIluminacionModule {}

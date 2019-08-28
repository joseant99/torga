import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    IluminacionProdPrePedComponent,
    IluminacionProdPrePedDetailComponent,
    IluminacionProdPrePedUpdateComponent,
    IluminacionProdPrePedDeletePopupComponent,
    IluminacionProdPrePedDeleteDialogComponent,
    iluminacionProdPrePedRoute,
    iluminacionProdPrePedPopupRoute
} from './';

const ENTITY_STATES = [...iluminacionProdPrePedRoute, ...iluminacionProdPrePedPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IluminacionProdPrePedComponent,
        IluminacionProdPrePedDetailComponent,
        IluminacionProdPrePedUpdateComponent,
        IluminacionProdPrePedDeleteDialogComponent,
        IluminacionProdPrePedDeletePopupComponent
    ],
    entryComponents: [
        IluminacionProdPrePedComponent,
        IluminacionProdPrePedUpdateComponent,
        IluminacionProdPrePedDeleteDialogComponent,
        IluminacionProdPrePedDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosIluminacionProdPrePedModule {}

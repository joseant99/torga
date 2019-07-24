import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    RepresentanteComponent,
    RepresentanteDetailComponent,
    RepresentanteUpdateComponent,
    RepresentanteDeletePopupComponent,
    RepresentanteDeleteDialogComponent,
    representanteRoute,
    representantePopupRoute
} from './';

const ENTITY_STATES = [...representanteRoute, ...representantePopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepresentanteComponent,
        RepresentanteDetailComponent,
        RepresentanteUpdateComponent,
        RepresentanteDeleteDialogComponent,
        RepresentanteDeletePopupComponent
    ],
    entryComponents: [
        RepresentanteComponent,
        RepresentanteUpdateComponent,
        RepresentanteDeleteDialogComponent,
        RepresentanteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosRepresentanteModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    RepresentanteTiendaComponent,
    RepresentanteTiendaDetailComponent,
    RepresentanteTiendaUpdateComponent,
    RepresentanteTiendaDeletePopupComponent,
    RepresentanteTiendaDeleteDialogComponent,
    representanteTiendaRoute,
    representanteTiendaPopupRoute
} from './';

const ENTITY_STATES = [...representanteTiendaRoute, ...representanteTiendaPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepresentanteTiendaComponent,
        RepresentanteTiendaDetailComponent,
        RepresentanteTiendaUpdateComponent,
        RepresentanteTiendaDeleteDialogComponent,
        RepresentanteTiendaDeletePopupComponent
    ],
    entryComponents: [
        RepresentanteTiendaComponent,
        RepresentanteTiendaUpdateComponent,
        RepresentanteTiendaDeleteDialogComponent,
        RepresentanteTiendaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosRepresentanteTiendaModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    NiveladoresComponent,
    NiveladoresDetailComponent,
    NiveladoresUpdateComponent,
    NiveladoresDeletePopupComponent,
    NiveladoresDeleteDialogComponent,
    niveladoresRoute,
    niveladoresPopupRoute
} from './';

const ENTITY_STATES = [...niveladoresRoute, ...niveladoresPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NiveladoresComponent,
        NiveladoresDetailComponent,
        NiveladoresUpdateComponent,
        NiveladoresDeleteDialogComponent,
        NiveladoresDeletePopupComponent
    ],
    entryComponents: [NiveladoresComponent, NiveladoresUpdateComponent, NiveladoresDeleteDialogComponent, NiveladoresDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosNiveladoresModule {}

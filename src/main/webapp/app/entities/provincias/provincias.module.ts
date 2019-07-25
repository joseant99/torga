import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ProvinciasComponent,
    ProvinciasDetailComponent,
    ProvinciasUpdateComponent,
    ProvinciasDeletePopupComponent,
    ProvinciasDeleteDialogComponent,
    provinciasRoute,
    provinciasPopupRoute
} from './';

const ENTITY_STATES = [...provinciasRoute, ...provinciasPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProvinciasComponent,
        ProvinciasDetailComponent,
        ProvinciasUpdateComponent,
        ProvinciasDeleteDialogComponent,
        ProvinciasDeletePopupComponent
    ],
    entryComponents: [ProvinciasComponent, ProvinciasUpdateComponent, ProvinciasDeleteDialogComponent, ProvinciasDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosProvinciasModule {}

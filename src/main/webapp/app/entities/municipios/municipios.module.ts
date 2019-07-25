import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    MunicipiosComponent,
    MunicipiosDetailComponent,
    MunicipiosUpdateComponent,
    MunicipiosDeletePopupComponent,
    MunicipiosDeleteDialogComponent,
    municipiosRoute,
    municipiosPopupRoute
} from './';

const ENTITY_STATES = [...municipiosRoute, ...municipiosPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MunicipiosComponent,
        MunicipiosDetailComponent,
        MunicipiosUpdateComponent,
        MunicipiosDeleteDialogComponent,
        MunicipiosDeletePopupComponent
    ],
    entryComponents: [MunicipiosComponent, MunicipiosUpdateComponent, MunicipiosDeleteDialogComponent, MunicipiosDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosMunicipiosModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    ImagenDeCestaProdComponent,
    ImagenDeCestaProdDetailComponent,
    ImagenDeCestaProdUpdateComponent,
    ImagenDeCestaProdDeletePopupComponent,
    ImagenDeCestaProdDeleteDialogComponent,
    imagenDeCestaProdRoute,
    imagenDeCestaProdPopupRoute
} from './';

const ENTITY_STATES = [...imagenDeCestaProdRoute, ...imagenDeCestaProdPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImagenDeCestaProdComponent,
        ImagenDeCestaProdDetailComponent,
        ImagenDeCestaProdUpdateComponent,
        ImagenDeCestaProdDeleteDialogComponent,
        ImagenDeCestaProdDeletePopupComponent
    ],
    entryComponents: [
        ImagenDeCestaProdComponent,
        ImagenDeCestaProdUpdateComponent,
        ImagenDeCestaProdDeleteDialogComponent,
        ImagenDeCestaProdDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosImagenDeCestaProdModule {}

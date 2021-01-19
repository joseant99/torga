import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from 'app/entities/vista-cliente/spanish-paginator-intl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TorgaPedidosSharedModule } from 'app/shared';
import {
    VistaAdminComponent,
    vistadminRoute,
    adminPopupRoute,
    UploadPopupComponent,
    UploadDialogComponent,
    inicioComponent,
    cestaComponent
} from './';

const ENTITY_STATES = [...vistadminRoute, ...adminPopupRoute];

@NgModule({
    imports: [
        TorgaPedidosSharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [VistaAdminComponent, UploadPopupComponent, UploadDialogComponent, inicioComponent, cestaComponent],
    exports: [MatSortModule],
    providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
    entryComponents: [VistaAdminComponent, UploadPopupComponent, UploadDialogComponent, inicioComponent, cestaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosVistaAdminModule {}

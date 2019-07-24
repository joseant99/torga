import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from 'app/entities/vista-cliente/spanish-paginator-intl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TorgaPedidosSharedModule } from 'app/shared';
import { VistaRepresentanteComponent, vistarepresentanteRoute } from './';

const ENTITY_STATES = [...vistarepresentanteRoute];

@NgModule({
    imports: [
        TorgaPedidosSharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [VistaRepresentanteComponent],
    exports: [MatSortModule],
    providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
    entryComponents: [VistaRepresentanteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosVistaRepresentanteModule {}

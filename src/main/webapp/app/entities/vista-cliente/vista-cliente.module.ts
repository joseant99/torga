import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from 'app/entities/vista-cliente/spanish-paginator-intl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TorgaPedidosSharedModule } from 'app/shared';
import { VistaClienteComponent, vistaclienteRoute } from './';

const ENTITY_STATES = [...vistaclienteRoute];

@NgModule({
    imports: [
        TorgaPedidosSharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [VistaClienteComponent],
    exports: [MatSortModule],
    providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
    entryComponents: [VistaClienteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosVistaClienteModule {}

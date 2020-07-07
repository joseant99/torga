import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import {
    UsbComponent,
    UsbDetailComponent,
    UsbUpdateComponent,
    UsbDeletePopupComponent,
    UsbDeleteDialogComponent,
    usbRoute,
    usbPopupRoute
} from './';

const ENTITY_STATES = [...usbRoute, ...usbPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [UsbComponent, UsbDetailComponent, UsbUpdateComponent, UsbDeleteDialogComponent, UsbDeletePopupComponent],
    entryComponents: [UsbComponent, UsbUpdateComponent, UsbDeleteDialogComponent, UsbDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosUsbModule {}

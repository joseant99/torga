import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsb } from 'app/shared/model/usb.model';

@Component({
    selector: 'jhi-usb-detail',
    templateUrl: './usb-detail.component.html'
})
export class UsbDetailComponent implements OnInit {
    usb: IUsb;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usb }) => {
            this.usb = usb;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFPago } from 'app/shared/model/f-pago.model';

@Component({
    selector: 'jhi-f-pago-detail',
    templateUrl: './f-pago-detail.component.html'
})
export class FPagoDetailComponent implements OnInit {
    fPago: IFPago;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fPago }) => {
            this.fPago = fPago;
        });
    }

    previousState() {
        window.history.back();
    }
}

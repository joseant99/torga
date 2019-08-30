import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';

@Component({
    selector: 'jhi-pagos-tienda-detail',
    templateUrl: './pagos-tienda-detail.component.html'
})
export class PagosTiendaDetailComponent implements OnInit {
    pagosTienda: IPagosTienda;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagosTienda }) => {
            this.pagosTienda = pagosTienda;
        });
    }

    previousState() {
        window.history.back();
    }
}

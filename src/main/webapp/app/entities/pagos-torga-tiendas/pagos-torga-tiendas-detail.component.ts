import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagosTorgaTiendas } from 'app/shared/model/pagos-torga-tiendas.model';

@Component({
    selector: 'jhi-pagos-torga-tiendas-detail',
    templateUrl: './pagos-torga-tiendas-detail.component.html'
})
export class PagosTorgaTiendasDetailComponent implements OnInit {
    pagosTorgaTiendas: IPagosTorgaTiendas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagosTorgaTiendas }) => {
            this.pagosTorgaTiendas = pagosTorgaTiendas;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecioTienda } from 'app/shared/model/precio-tienda.model';

@Component({
    selector: 'jhi-precio-tienda-detail',
    templateUrl: './precio-tienda-detail.component.html'
})
export class PrecioTiendaDetailComponent implements OnInit {
    precioTienda: IPrecioTienda;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioTienda }) => {
            this.precioTienda = precioTienda;
        });
    }

    previousState() {
        window.history.back();
    }
}

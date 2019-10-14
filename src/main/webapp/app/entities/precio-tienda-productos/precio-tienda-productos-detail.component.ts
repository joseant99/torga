import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecioTiendaProductos } from 'app/shared/model/precio-tienda-productos.model';

@Component({
    selector: 'jhi-precio-tienda-productos-detail',
    templateUrl: './precio-tienda-productos-detail.component.html'
})
export class PrecioTiendaProductosDetailComponent implements OnInit {
    precioTiendaProductos: IPrecioTiendaProductos;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioTiendaProductos }) => {
            this.precioTiendaProductos = precioTiendaProductos;
        });
    }

    previousState() {
        window.history.back();
    }
}

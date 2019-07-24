import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductosComposicion } from 'app/shared/model/productos-composicion.model';

@Component({
    selector: 'jhi-productos-composicion-detail',
    templateUrl: './productos-composicion-detail.component.html'
})
export class ProductosComposicionDetailComponent implements OnInit {
    productosComposicion: IProductosComposicion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosComposicion }) => {
            this.productosComposicion = productosComposicion;
        });
    }

    previousState() {
        window.history.back();
    }
}

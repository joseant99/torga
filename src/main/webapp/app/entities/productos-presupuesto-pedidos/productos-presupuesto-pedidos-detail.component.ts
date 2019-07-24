import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';

@Component({
    selector: 'jhi-productos-presupuesto-pedidos-detail',
    templateUrl: './productos-presupuesto-pedidos-detail.component.html'
})
export class ProductosPresupuestoPedidosDetailComponent implements OnInit {
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosPresupuestoPedidos }) => {
            this.productosPresupuestoPedidos = productosPresupuestoPedidos;
        });
    }

    previousState() {
        window.history.back();
    }
}

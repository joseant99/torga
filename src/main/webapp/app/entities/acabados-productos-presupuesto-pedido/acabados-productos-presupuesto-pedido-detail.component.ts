import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';

@Component({
    selector: 'jhi-acabados-productos-presupuesto-pedido-detail',
    templateUrl: './acabados-productos-presupuesto-pedido-detail.component.html'
})
export class AcabadosProductosPresupuestoPedidoDetailComponent implements OnInit {
    acabadosProductosPresupuestoPedido: IAcabadosProductosPresupuestoPedido;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acabadosProductosPresupuestoPedido }) => {
            this.acabadosProductosPresupuestoPedido = acabadosProductosPresupuestoPedido;
        });
    }

    previousState() {
        window.history.back();
    }
}

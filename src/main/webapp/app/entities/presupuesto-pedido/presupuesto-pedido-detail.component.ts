import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

@Component({
    selector: 'jhi-presupuesto-pedido-detail',
    templateUrl: './presupuesto-pedido-detail.component.html'
})
export class PresupuestoPedidoDetailComponent implements OnInit {
    presupuestoPedido: IPresupuestoPedido;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoPedido }) => {
            this.presupuestoPedido = presupuestoPedido;
        });
    }

    previousState() {
        window.history.back();
    }
}

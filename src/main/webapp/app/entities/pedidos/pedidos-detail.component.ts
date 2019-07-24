import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPedidos } from 'app/shared/model/pedidos.model';

@Component({
    selector: 'jhi-pedidos-detail',
    templateUrl: './pedidos-detail.component.html'
})
export class PedidosDetailComponent implements OnInit {
    pedidos: IPedidos;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pedidos }) => {
            this.pedidos = pedidos;
        });
    }

    previousState() {
        window.history.back();
    }
}

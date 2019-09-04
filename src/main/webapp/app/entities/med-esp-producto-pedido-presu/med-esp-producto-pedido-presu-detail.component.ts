import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedEspProductoPedidoPresu } from 'app/shared/model/med-esp-producto-pedido-presu.model';

@Component({
    selector: 'jhi-med-esp-producto-pedido-presu-detail',
    templateUrl: './med-esp-producto-pedido-presu-detail.component.html'
})
export class MedEspProductoPedidoPresuDetailComponent implements OnInit {
    medEspProductoPedidoPresu: IMedEspProductoPedidoPresu;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medEspProductoPedidoPresu }) => {
            this.medEspProductoPedidoPresu = medEspProductoPedidoPresu;
        });
    }

    previousState() {
        window.history.back();
    }
}

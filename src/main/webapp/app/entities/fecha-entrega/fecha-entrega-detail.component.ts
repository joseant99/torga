import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFecha_entrega } from 'app/shared/model/fecha-entrega.model';

@Component({
    selector: 'jhi-fecha-entrega-detail',
    templateUrl: './fecha-entrega-detail.component.html'
})
export class Fecha_entregaDetailComponent implements OnInit {
    fecha_entrega: IFecha_entrega;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fecha_entrega }) => {
            this.fecha_entrega = fecha_entrega;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuestoArmario } from 'app/shared/model/presupuesto-armario.model';

@Component({
    selector: 'jhi-presupuesto-armario-detail',
    templateUrl: './presupuesto-armario-detail.component.html'
})
export class PresupuestoArmarioDetailComponent implements OnInit {
    presupuestoArmario: IPresupuestoArmario;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmario }) => {
            this.presupuestoArmario = presupuestoArmario;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuestoArmarioPuertas } from 'app/shared/model/presupuesto-armario-puertas.model';

@Component({
    selector: 'jhi-presupuesto-armario-puertas-detail',
    templateUrl: './presupuesto-armario-puertas-detail.component.html'
})
export class PresupuestoArmarioPuertasDetailComponent implements OnInit {
    presupuestoArmarioPuertas: IPresupuestoArmarioPuertas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmarioPuertas }) => {
            this.presupuestoArmarioPuertas = presupuestoArmarioPuertas;
        });
    }

    previousState() {
        window.history.back();
    }
}

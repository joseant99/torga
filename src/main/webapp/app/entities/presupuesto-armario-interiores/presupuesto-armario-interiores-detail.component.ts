import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresupuestoArmarioInteriores } from 'app/shared/model/presupuesto-armario-interiores.model';

@Component({
    selector: 'jhi-presupuesto-armario-interiores-detail',
    templateUrl: './presupuesto-armario-interiores-detail.component.html'
})
export class PresupuestoArmarioInterioresDetailComponent implements OnInit {
    presupuestoArmarioInteriores: IPresupuestoArmarioInteriores;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presupuestoArmarioInteriores }) => {
            this.presupuestoArmarioInteriores = presupuestoArmarioInteriores;
        });
    }

    previousState() {
        window.history.back();
    }
}
